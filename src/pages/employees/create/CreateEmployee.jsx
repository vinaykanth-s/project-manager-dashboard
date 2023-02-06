import classes from './CreateEmployee.module.css'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../../../firebase/init'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const CreateEmployee = ({ inputs, title }) => {
  const navigate = useNavigate()
  const [file, setFile] = useState('')
  const [data, setData] = useState({})
  const [progressPercentage, setProgressPercentage] = useState(null)

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          setProgressPercentage(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              return
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  const handleInput = (e) => {
    const id = e.target.id
    const value = e.target.value

    setData({ ...data, [id]: value })
  }

  // console.log(data)

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        'test123'
      )
      await setDoc(doc(db, 'employees', res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      })
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={classes.newContainer}>
      <Navbar />
      <div className={classes.top}>
        <h1>{title}</h1>
      </div>
      <div className={classes.bottom}>
        <div className={classes.left}>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            }
            alt=""
          />
        </div>
        <div className={classes.right}>
          <form onSubmit={handleAdd}>
            <div className={classes.formInput}>
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </div>

            {inputs.map((input) => (
              <div className={classes.formInput} key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
              </div>
            ))}
            <button
              disabled={progressPercentage !== null && progressPercentage < 100}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEmployee
