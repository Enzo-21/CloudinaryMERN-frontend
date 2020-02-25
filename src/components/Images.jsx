import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

export default class Images extends Component {

    state = {
        images: []
    }

    componentDidMount() {
        this.showImages();
       
    }

    showImages = async () => {
        const res = await axios.get('https://cloudinary-mern.herokuapp.com/images')
        this.setState({ images: res.data })
        this.masonry()
    }

    masonry = () => {
        const masonryLayout = (containerElem, itemsElems, columns) => {
            containerElem.classList.add('masonry-layout', `columns-${columns}`);
            let columnsElements = [];
        
            for (let i = 1; i <= columns; i++) {
                let column = document.createElement('div');
                column.innerHTML = ''
                column.classList.add('masonry-column', `column-${i}`);
                containerElem.appendChild(column);
                columnsElements.push(column);   
            }
        
            for (let m = 0; m < Math.ceil(itemsElems.length / columns); m++) {
              for (let n = 0; n < columns; n++) {
                  let item = itemsElems[m * columns + n];
                  columnsElements[n].appendChild(item);
                  item.classList.add('masonry-item')
              }
            }
        };
        
        
        masonryLayout(document.getElementById('gallery'), document.querySelectorAll('.gallery-item'), 3)
    }

    render() {
        return (


            <div className="gallery" id='gallery' >

                {this.state.images.map(image => (
                    
                        <div key={image.imageURL} className="gallery-item"><img src={image.imageURL} alt="gallery-item" /></div>
                  
                ))}



            </div>

        )
    }
}
