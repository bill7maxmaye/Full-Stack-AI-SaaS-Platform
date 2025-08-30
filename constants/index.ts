// src/constants/navLinks.js
import { FaBrush, FaCode, FaCreditCard, FaHome, FaPaintBrush, FaProjectDiagram, FaRemoveFormat, FaUser } from "react-icons/fa";
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
    subTitle: "Enhance an image's dimensions using AI outpainting",
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

// Form field configurations for different transformation types
export const formFields = {
  fill: [
    {
      name: "title",
      label: "Image Title",
      type: "text",
      placeholder: "Enter image title",
      required: true,
    },
    {
      name: "aspectRatio",
      label: "Aspect Ratio",
      type: "select",
      placeholder: "Select size",
      options: [
        { value: "1:1", label: "Square (1:1)" },
        { value: "4:3", label: "Standard (4:3)" },
        { value: "16:9", label: "Widescreen (16:9)" },
        { value: "3:4", label: "Portrait (3:4)" },
        { value: "9:16", label: "Mobile (9:16)" },
      ],
      required: true,
    },
  ],
  restore: [
    {
      name: "title",
      label: "Image Title",
      type: "text",
      placeholder: "Enter image title",
      required: true,
    },
  ],
  removeBackground: [
    {
      name: "title",
      label: "Image Title",
      type: "text",
      placeholder: "Enter image title",
      required: true,
    },
  ],
  objectRemove: [
    {
      name: "title",
      label: "Image Title",
      type: "text",
      placeholder: "Enter image title",
      required: true,
    },
    {
      name: "prompt",
      label: "Object to Remove",
      type: "text",
      placeholder: "Describe the object you want to remove",
      required: true,
    },
  ],
  objectRecolor: [
    {
      name: "title",
      label: "Image Title",
      type: "text",
      placeholder: "Enter image title",
      required: true,
    },
    {
      name: "prompt",
      label: "Object to Recolor",
      type: "text",
      placeholder: "Describe the object you want to recolor",
      required: true,
    },
    {
      name: "color",
      label: "New Color",
      type: "text",
      placeholder: "Enter the new color (e.g., red, blue, #FF0000)",
      required: true,
    },
  ],
};

// Default values for forms
export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

// export const defaulValues ={
//  title: "",
//  aspectRation:"",
//  color:"",
//  prompt:"",
//  publicId:"",
// }
