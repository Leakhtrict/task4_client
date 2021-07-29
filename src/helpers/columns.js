export const COLUMNS = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Username",
        accessor: "username"
    },
    {
        Header: "E-mail",
        accessor: "email"
    },
    {
        Header: "Reg. date",
        accessor: "createdAt",
        Cell: (props) => {
            const normalDate = props.value;
            return <div>{new Date(normalDate).toLocaleString()}</div>
        }
    },
    {
        Header: "Last login",
        accessor: "lastLogin",
        Cell: (props) => {
            if(props.value){
                const normalDate = props.value;
                return <div>{new Date(normalDate).toLocaleString()}</div>
            }
            else{
                return <div />
            }
        }
    },
    {
        Header: "Status",
        accessor: "status"
    }
]