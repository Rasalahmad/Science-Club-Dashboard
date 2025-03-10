export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`https://club.hotelgreenlandbd.com/images/${params.row.image}`}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "batch",
    headerName: "Batch",
    width: 150,
  },

  {
    field: "designation",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
];

export const facultyColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`https://club.hotelgreenlandbd.com/images/${params.row.image}`}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
];
export const courseColumn = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Course Name",
    width: 350,
  },

  {
    field: "course_id",
    headerName: "Course ID",
    width: 200,
  },
  {
    field: "credit",
    headerName: "Credit",
    width: 200,
  },
];

export const resultColumn = [
  {
    field: "course_id",
    headerName: "Course Code",
    width: 200,
  },
  {
    field: "name",
    headerName: "Course Name",
    width: 350,
  },
  {
    field: "credit",
    headerName: "Credit",
    width: 200,
  },
  {
    field: "marks",
    headerName: "Marks",
    width: 200,
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
