import { useEffect, useState } from "react"
import { Container, Button, Badge } from "react-bootstrap"
import axios from "axios"
import Edit from "./edit"

function Dashboard({ title }) {
  const [absensiList, setAbsensiList] = useState([])
  const [absenNotif, setAbsenNotif] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("nama") && !localStorage.getItem('nip')) {
            console.log('user belum login')
            window.location.replace("/login")
        }
        axios({
          method:"GET",
          url:"http://localhost:3200/absensi"
        }).then((result) => setAbsensiList(result.data.absensi))

    }, [absenNotif])
   
    const logout = () => {
      localStorage.clear()
      window.location.reload()
    }
    
    const absen = (params) => {
      const requestingData = {
        nip: localStorage.getItem("nip")
      }
      axios({
        method: "POST",
        url: `http://localhost:3200/absensi/${params}`,
        data: requestingData
      }).then(() => {
       setAbsenNotif(!absenNotif)
      })
    }

    return (
        <Container>
          <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">{localStorage.getItem("nama")}</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calender" className="align-text-bottom"></span>
                  This week
                </button>
              </div>
            </div>
            <h2>{title}</h2>
           <div>
              <p>Hello {localStorage.getItem("nama")}!</p>
              <p>nip {localStorage.getItem("nip")} </p>
              <Button onClick={() => logout()} className="mt-4" size="sm" variant="danger" >Logout</Button>
           </div>
           <Edit title="Edit Profile" />
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">NIP</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    absensiList.map((absensi, i) => {
                      const {users_nip, status, createdAt} = absensi
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{users_nip}</td>
                          <td>{status}</td>
                          <td>{createdAt}</td>
                        </tr>
                      )      
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center gap-2">
            <Badge pill bg="primary" style={{ cursor: "pointer" }} onClick={() => absen("checkin")}>
              Checkin
            </Badge>
            <Badge pill bg="danger" style={{ cursor: "pointer" }} onClick={() => absen("checkout")}>
              Checkout
            </Badge>
            </div>
        </main>
      </Container>
  )
}

export default Dashboard