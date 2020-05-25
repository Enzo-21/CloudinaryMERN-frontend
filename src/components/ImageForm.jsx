import React, { Component } from 'react'
import axios from 'axios'

export default class ImageForm extends Component {

    state = {
        title: '',
        description: '',
        image: null,
        images: [],
    }

    getImageData = async () => {
        const res = await axios.get('https://cloudinary-mern.herokuapp.com/images')
        this.setState({ images: res.data })
    }

    componentDidMount() {
        this.getImageData();
    }

    addImage = async (e) => {
        e.preventDefault()

        const fd = new FormData();
        fd.append('image', this.state.image, this.state.image.name)
        fd.append('title', this.state.title);
        fd.append('description', this.state.description);
        await axios.post('https://cloudinary-mern.herokuapp.com/images/add', fd)
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);

            })
        this.getImageData();
        this.setState({
            image: null
        })
        document.getElementById("upload-image-form").reset()
        
    }

    deleteImage = async (id) => {
        await axios.delete(`https://cloudinary-mern.herokuapp.com/images/delete/${id}`)
        this.getImageData();
    }

    fileSelectedHandler = e => {
        this.setState({
            image: e.target.files[0]
        })
    }



    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <form id='upload-image-form' onSubmit={this.addImage} encType="multipart/form-data">
                                <div className="form-group">
                                    <input onChange={this.onChangeInput} className="form-control" placeholder="Title" type="text" name="title"></input>
                                </div>

                                <div className="form-group">
                                    <textarea onChange={this.onChangeInput} className="form-control" name="description" placeholder="Description"></textarea>
                                </div>

                                <div className="input-group">
                                    <div className="custom-file">
                                        <input onChange={this.fileSelectedHandler} type="file" name="image" className="custom-file-input" id="inputGroupFile01" />
                                    </div>
                                    
                                    <label htmlFor="inputGroupFile01" className="custom-file-label">Select file</label> </div>

                                {(!this.state.image) ? (
                                '') : (
                                    <p>Selected file: {this.state.image.name}</p>
                                ) }

                                
                                {(this.state.image) ? (
                                    <button className="btn btn-primary" type='submit'>Upload photo</button>
                                ) : null}

                                
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Descripcion</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {this.state.images.map(image => (
                                <tr key={image.public_id}>
                                    <td>
                                        {image.title}
                                    </td>
                                    <td>
                                        {image.description}
                                    </td>
                                    <td>
                                        <a className="btn btn-primary" href={image.imageURL} rel="noopener noreferrer" target="_blank">View</a>
                                        <button  className="btn btn-danger" onClick={() => this.deleteImage(image._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
