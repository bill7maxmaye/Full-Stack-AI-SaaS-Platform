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
    route: "/transformations/add/remove",
    icon: FaRemoveFormat
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
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
