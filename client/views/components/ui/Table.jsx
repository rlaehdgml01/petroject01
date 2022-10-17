import React from "react";
import styled from "styled-components";

export default function Table({ data, header }) {
  return (
    <table>
      <thead>
        <tr className="tr-style">
          {header.map((item, index) => {
            return (
              <th className="th-style" key={index}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td className="td-style">
                <input type="checkbox" />
              </td>
              <td>{item.care_request_number}</td>
              <td>{item.care_request_title}</td>
              <td>{item.care_request_insert_datetime}</td>
              <td>{item.care_request_insert_user_id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
