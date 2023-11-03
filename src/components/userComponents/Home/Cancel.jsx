import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa';

function Cancel() {

    const history = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            history('/')
        }, 3000)

        return (
            clearTimeout()
        )
    })

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="text-center" style={{ width: "100%", height: "200px" }}>
                <FaTimes style={{ color: "red", width: "100%", height: "100%" }} />
                <h4>Appointment booking failed</h4>
            </div>
        </div>


    )
}

export default Cancel

