// src/constants/navLinks.js
import { FaHome, FaCode, FaProjectDiagram, FaEnvelope, FaUser, FaRemoveFormat, FaCloudMoonRain, FaCreditCard, FaBrush, FaPaintBrush } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";

export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: FaHome,
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: FaCode,
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: FaProjectDiagram,
  },
  {
    label: "Object Remove",
    route: "/transformations/add/objectRemove",
    icon: FaRemoveFormat
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/objectRecolor",
    icon: FaPaintBrush,
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: FaBoxesPacking,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: FaUser,
  },
  {
    label: "Buy Credit",
    route: "/credits",
    icon: FaCreditCard,
  },
];


export const transformationTypes = {
  restore:{
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config:{restore:true},
    icon:FaCode
  },
  removeBackground:{
    type: "removeBackground",
    title: "Remove Background",
    subTitle: "Remove the backgrounds from images using AI",
    config:{removeBackground:true},
    icon:FaBoxesPacking
  },

  fill:{
    type: "fill",
    title: "Generative Fill",
    subTitle: "Fill in missing parts of images",
    config:{fill:true},
    icon:FaProjectDiagram
  },
  objectRemove:{
    type: "objectRemove",
    title: "Object Remove",
    subTitle: "Identify and remove objects from images",
    config:{objectRemove:true},
    icon:FaRemoveFormat
  },

  objectRecolor:{
    type: "objectRecolor",
    title: "Object Recolor",
    subTitle: "Recolor specific objects in images",
    config:{objectRecolor:true},
    icon:FaBrush
  }

}

export const defaulValues ={
 title: "",
 aspectRation:"",
 color:"",
 prompt:"",
 publicId:"",
}
