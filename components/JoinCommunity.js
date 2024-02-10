import React, { useState, useEffect } from "react";
import uri from "./URL";

function DataFetcher({ rid, cid }) {
  const url = uri + "add_members.php";
  const fetchData = async () => {
    const data = new FormData();
    data.append("rid", rid);
    data.append("cid", cid);
    const options = { method: "POST", body: data };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const result = await response.json();
    } catch (err) {
    } finally {
    }
  };

  fetchData();
}

export default DataFetcher;
