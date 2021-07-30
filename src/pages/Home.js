import React from 'react';
import axios from 'axios';
import { useEffect, useState, forwardRef, useRef, useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { COLUMNS } from "../helpers/columns";
import { useHistory } from "react-router-dom";

const SelectCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
);

function Home() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    axios.get("https://itransition-summer-task4.herokuapp.com/users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  let history = useHistory();

  const columns = useMemo(() => COLUMNS, []);

  const MainTable = () => {
    const tableInstance = useTable({
      columns: columns,
      data: listOfUsers
    },
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <SelectCheckbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => (
                <SelectCheckbox {...row.getToggleRowSelectedProps()} />
              )
            },
            ...columns,
          ];
        });
      }
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
    } = tableInstance;

    const deleteData = () => {
      axios.get("https://itransition-summer-task4.herokuapp.com/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (!response.data.error) {
          const deleteIds = selectedFlatRows.map(row => row.original.id);
          axios.put("https://itransition-summer-task4.herokuapp.com/users/deleteUsers", deleteIds);
          history.go(0);
        }
        else{
          history.push("/login");
        }
      });
    };

    const blockUser = () => {
      axios.get("https://itransition-summer-task4.herokuapp.com/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (!response.data.error) {
          const blockIds = selectedFlatRows.map(row => row.original.id);
          axios.put("https://itransition-summer-task4.herokuapp.com/users/blockUsers", blockIds);
          history.go(0);
        }
        else{
          history.push("/login");
        }
      });
    };

    const unblockUser = () => {
      axios.get("https://itransition-summer-task4.herokuapp.com/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (!response.data.error) {
          const unblockIds = selectedFlatRows.map(row => row.original.id);
          axios.put("https://itransition-summer-task4.herokuapp.com/users/unblockUsers", unblockIds);
          history.go(0);
        }
        else{
          history.push("/login");
        }
      });
    };

    return(
      <>
        <div className="buttonBar">
          <button className="buttons" onClick={blockUser} title="Block">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" class="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
          </button>
          <button className="buttons" onClick={unblockUser} title="Unblock">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" class="bi bi-unlock-fill" viewBox="0 0 16 16">
              <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
            </svg>
          </button>
          <button className="buttons" onClick={deleteData} title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" class="bi bi-person-x-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <table className="mainTable" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
      </>
    );
  };

    return (
        <div className="homePage">
            <MainTable />
        </div>
    );
}

export default Home;
