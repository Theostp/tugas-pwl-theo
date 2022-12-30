import {useState} from "react"
import {Form, Button} from "react-bootstrap"
import axios from "axios"

const Edit = ({ title }) => {
  
  const [nama, setNama] = useState("")
  const [password, setPassword] = useState("")
  const [passwordBaru, setPasswordBaru] = useState("")
    
  const updateProfile = () => {
    const requestingData = {
        nip: localStorage.getItem("nip"),
        passwordBaru:passwordBaru,
        password: password,
        nama: nama
    }
    axios({
        method: "PUT",
        url: "http://localhost:3200/users",
        data: requestingData
    }).then(() => {
        alert("anda akan keluar dari sistem,silahkan login kembali.")
    })
  }
  
    return (
    <Form className="my-4">
        <h3>{title}</h3>
        <Form.Group>
            <Form.Label>Nama</Form.Label>
            <Form.Control onChange={(event) => setNama(event.target.value) } defaultValue={localStorage.getItem("nama")} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password Baru</Form.Label>
            <Form.Control onChange={(event) => setPasswordBaru(event.target.value) } />
        </Form.Group>
        <hr />
        <Form.Group>
            <Form.Label>Password Lama</Form.Label>
            <Form.Control onChange={(event) => setPassword(event.target.value) } />
            <Form.Text>Silahkan masukkan password lama and. Anda diharuskan melakukan login ulang setelah mengupdate password.</Form.Text>
        </Form.Group>
        <Button className="w-100">Update Profile</Button>
    </Form>
  )  
}


export default Edit