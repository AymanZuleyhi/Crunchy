import "./Ben.css";
import { useEffect, useState } from "react"
import assets from "../../assets/assets";

function Ben() {
    const [options, setOptions] = useState([
        { logo: assets.Yotpo, number: 4, status: false, timer: 0, text: "Yotpo: Ben was instrumental in untangling complex RCS concepts and transforming them into a pleasant and cohesive UX. His work on both the design and copy side helped Yotpo achieve a >50% drop in dead/rage clicks in registration pages.", author: "Constantin Popov", subheading: "Product Manager @ Yotpo", pic: assets.one },
        { logo: assets.Expondo, number: 1, status: true, timer: 0, text: `Benjamin is a very effective content person that solved many of the problems we were facing during our time together.`, author: "Kiril Singer", subheading: "Brand Designer @ Expondo", pic: assets.two },
        { logo: assets.H, number: 2, status: false, timer: 0, text: "Benjamin's contributions to our projects at Horizon65 were outstanding. He excels in crafting clear and concise content from complex material, always delivering with speed and precision. His professionalism and commitment to excellence made working with him a true pleasure", author: "Gali Gaviria", subheading: "UX/UI Designer @ Horizon65", pic: assets.three },
        { logo: assets.Vimcar, number: 3, status: false, timer: 0, text: `Thanks to his help, we were able to double our conversion rate and we now continue to reap the rewards of the work he was able to do for us. I would highly recommend Ben as a reliable partner to collaborate with.`, author: "Sam Rucker", subheading: "Content Marketer @ Vimcar", pic: assets.four }
    ])

    const [timer, setTimer] = useState(0)

    const changeActive = (num) => {
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                return option.number === num.number
                    ? { ...option, status: true, timer: 0 }
                    : { ...option, status: false, timer: 0 }
            })
        })

        setTimer(0)
    }

    useEffect(() => {
        if (timer === 10) {
            const active = options.filter((each) => each.status === true)

            const id =
                active[0].number === options.length ? 0 : active[0].number

            console.log(options.length, id)
            setOptions((prevOptions) => {
                return prevOptions.map((option) => {
                    return option.number === id + 1
                        ? { ...option, status: true }
                        : { ...option, status: false }
                })
            })

            setTimer(0)
        }
    }, [timer])

    useEffect(() => {
        if (timer < 10) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1)
            }, 1000)

            return () => clearInterval(intervalId)
        }
    }, [timer])

    return (
        <div className="containers">
            
            {
              options.map((num) => {
                return (
                  <div className="content-box">

                    {num.status &&
                    <>

                      <div className="text">
                        <p>{num.text}</p>

                      </div>

                    <div className="user_box">
                      <img src={num.pic}/>
                      <div>
                        <p>{num.author}</p>
                        <p>{num.subheading}</p>
                      </div>
                    </div>

                    </>

                    }
                  </div>
                )
              })
            }

            <div className="options">
              {options.map((num) => {
                  return (
                      <div className={`each_box ${num.status ? "active" : "not-active"}`} onClick={() => changeActive(num)}>
                           <img src={num.logo}/>
                          {num.status && (
                              <div style={{ width: `${timer}0%`}} className={`loading-bar`}></div>
                          )}
                      </div>
                  )
              })}
            </div>

        </div>
    )
}

export default Ben