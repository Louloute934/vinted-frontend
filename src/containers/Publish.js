import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Publish = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState();
  const [data, setData] = useState();
  const token = userToken;
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("decription", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(response.data.result);

      setData(response.data.result);
      history.push(`/offer/${data._id}`);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <div className="page">
      <h2>Vends ton article</h2>
      <form className="publish" onSubmit={handleSubmit}>
        <div className="sella">
          <input
            type="file"
            placeholder="Choisis ta photo"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          <button> + Ajoute une photo</button>
        </div>
        <div className="firstsection">
          <div className="inputs">
            <h4>Titre</h4>
            <input
              type="text"
              placeholder="ex: Chemise Sézanne verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="inputs">
            <h4>Décris ton article</h4>
            <input
              className="desc"
              type="text"
              placeholder="ex: porté quelquefois, taille correctement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="firstsection">
          <div className="inputs">
            <h4>Marque</h4>
            <input
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="inputs">
            <h4>Taille</h4>
            <input
              type="text"
              placeholder="ex: L /40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="inputs">
            <h4>Couleur</h4>
            <input
              type="text"
              placeholder="ex:Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="inputs">
            <h4>Etat</h4>
            <input
              type="text"
              placeholder="Neuf avec étiquette"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="inputs">
            <h4>Lieu</h4>
            <input
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="lastsection">
          <div className="inputs">
            <h4>Prix</h4>
            <input
              type="Number"
              placeholder="0.00 €"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="checkbox">
          <input type="checkbox" />
          <h4>Je suis intéressé par les échanges</h4>
        </div>

        <div className="submission">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};
export default Publish;
