import styles from './CreateProject.module.css'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { auth, db, storage } from '../../../firebase/init'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { doc, serverTimestamp, collection, addDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'

const CreateProject = ({ inputs, title }) => {
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
    // console.log({ project: data })
    try {
      // console.log({ data })
      // console.log({ data })
      await addDoc(collection(db, 'projects'), data)
      navigate(-1)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div className={styles.newContainer}>
      <Navbar />
      <div className={styles.top}>
        <h1>{title}</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            }
            alt=""
          />
        </div>
        <div className={styles.right}>
          <form className={styles.newProjectForm} onSubmit={handleAdd}>
            <div className={styles.formInput}>
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className={styles.icon} />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </div>

            {inputs.map((input) => (
              <div className={styles.formInput} key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
              </div>
            ))}
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProject
