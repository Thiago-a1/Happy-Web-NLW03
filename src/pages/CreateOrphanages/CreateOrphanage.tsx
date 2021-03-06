import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from "react-icons/fi";

import Sidebar from "../../components/Sidebar/Sidebar";
import mapIcon from "../../utils/mapIcon";

import './create-orphanage.css';
import api from "../../services/api";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude: 0})

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setIntructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    console.log(position);

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleDeleteImageToPreview(image: string, position: number) {
    if (!images) {
      return;
    }

    const imageDelete = images.splice(images.indexOf(images[position]), 1);

    setImages(imageDelete);

    const imageDeletePreview = previewImages.filter(imagePreview => imagePreview !== image);

    console.log(images);

    setPreviewImages(imageDeletePreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })

    // await api.post('orphanages', data);

    history.push('/confirmation');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-22.952623866495447,-43.18482041358948]} 
              style={{ width: '100%', height: 280 }}
              zoom={11}
              onclick={handleMapClick}
              className="map"
            >
              <TileLayer 
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position.latitude !== 0 
              && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude, position.longitude]} 
                  />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                required
                onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                required
                onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div 
                      className="image-container"
                      key={image}
                      >
                       <button 
                        className="close-container" 
                        type="button"
                        onClick={() => handleDeleteImageToPreview(image, index)}>
                         <FiX size={24} color="#FF518F"/>
                       </button>
                      <img key={image} src={image} alt={name}/>
                    </div>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                type="file" 
                id="image[]"
                multiple 
                required
                onChange={handleSelectImage}
                />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                required
                onChange={event => setIntructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                required
                onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana ?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >Sim</button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
