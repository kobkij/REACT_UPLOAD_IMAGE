import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure'

function App() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])


    const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', selectedFile)
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setPreview(response.statusText)
  }


  
  return (
    <div className="App">
      <header className="App-header">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <hr></hr>
        <Figure>
          <Figure.Image
            width={500}
            height={500}
            alt="500x500"
            src={preview}
          />
        </Figure>
        <Form.Control type="file" onChange={onSelectFile} />
      </Form.Group>
      <hr></hr>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
      </Button>
      <hr></hr>
      {preview && <h4>{preview}</h4>}
  </header>
    </div>
  );
}

export default App;
