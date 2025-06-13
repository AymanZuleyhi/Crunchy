import "./NavMenu.css";

function NavMenu(props) {
  const { menu, setMenu } = props;

  const handleClick = (nav) => {
    setMenu((prevMenu) => {
      return prevMenu.map((menu) => {
        return menu.name === nav.name
        ? {...menu, active: true}
        : {...menu, active: false}
      });
    });

    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="NAV_MENU">
      {
        menu.map((nav) => {
          return (
            <div key={nav.name} onClick={() => handleClick(nav)} className="nav-button">
              <p style={{ fontWeight: nav.active ? "bold" : "normal" }}>{nav.name}</p>
              {nav.active &&
                <div></div>
              }
            </div>
          )
        })
      }
    </div>
  )
};

export default NavMenu;