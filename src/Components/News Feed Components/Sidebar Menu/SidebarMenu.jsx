import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarMenu(props) {
  const { sidebarMenu, setSidebarMenu } = props;

  const changeActiveItem = (menu) => {
    setSidebarMenu((prevSidebar) => {
      return prevSidebar.map((eachItem) => {
        return eachItem.name === menu.name
        ? { ...eachItem, active: true }
        : { ...eachItem, active: false }
      })
    })
  };

  return (
    <div className="SIDEBAR-MENU">
      <div>

      </div>

      <div className="sidebar-menu_container">
        {
          sidebarMenu.map((menu) => {
            return (
              <div onClick={() => changeActiveItem(menu)} key={menu.name} className={`sidebar-item ${ menu.active ? "active" : "false" }`}>
                <FontAwesomeIcon icon={menu.icon}/>
                <p>{menu.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default SidebarMenu;