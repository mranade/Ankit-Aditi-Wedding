"use client";

import { useEffect, useState } from "react";

type Person = {
  name: string;
  groups: string[];
};

export default function SearchBar() {
  const [data, setData] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/sheets");
      const json = await res.json();
      setData(json);
    }

    load();
  }, []);

  const filtered =
    query.trim().length > 0
      ? data.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div>
      {/* 👇 DETAIL VIEW */}
      {selectedPerson ? (
        <div style={{ padding: 20 }}>
          <button
            onClick={() => setSelectedPerson(null)}
            style={{
              marginBottom: 20,
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            ← Search again
          </button>

          <h2 style={{ fontSize: 34, marginBottom: 20 }}>
            {selectedPerson.name}
          </h2>

          <div
            style={{
              background: "#faf7f2",
              padding: 20,
              borderRadius: 16,
            }}
          >
            <h3 style={{ marginBottom: 12, letterSpacing: 1 }}>
              YOUR PHOTO GROUPS
            </h3>

            <ul
              style={{
                paddingLeft: 0,
                fontSize: 20,
                lineHeight: 2,
                listStyle: "none",
              }}
            >
              {selectedPerson.groups.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* 👇 SEARCH INPUT */}
          <input
            placeholder="Type your name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginTop: 20,
            }}
          />

          {/* 👇 RESULTS (ONLY WHEN TYPING) */}
          {query.trim().length > 0 && (
            <div style={{ marginTop: 20 }}>
              {filtered.length > 0 ? (
                filtered.map((person, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPerson(person)}
                    style={{
                      background: "#fff7ed",
                      padding: 16,
                      borderRadius: 10,
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontWeight: "bold", fontSize: 18 }}>
                      {person.name}
                    </div>

                    <div style={{ marginTop: 10 }}>
                      {person.groups?.length > 0 ? (
                        person.groups.map((g, i) => (
                          <span
                            key={i}
                            style={{
                              display: "inline-block",
                              marginRight: 8,
                              marginTop: 8,
                              padding: "8px 12px",
                              background: "#e0f2fe",
                              borderRadius: 10,
                              fontSize: 18,
                              fontWeight: 500,
                            }}
                          >
                            {g}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: "#888" }}>No groups</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: "#888", marginTop: 10 }}>
                  No matches found
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
