import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import CommitteeDataTable from "../../components/datatable/CommitteeDataTable";

const List = () => {
  const location = useLocation();

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {location.pathname === "/users" ? (
          <Datatable />
        ) : (
          <CommitteeDataTable />
        )}
      </div>
    </div>
  );
};

export default List;
