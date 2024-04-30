import TextBoxSearch, { TextArea, TextBox } from "../components/ui/Inputs";
import ScreenHeader from "../components/ScreenHeader";
import ComboBox from "../components/ui/ComboBox";
import SelectSize from "../components/ui/SelectSize";
import SelectColor from "../components/ui/SelectColor";
import {
  EditButton,
  PrimaryButton,
  RemoveButton,
  SecondaryButton,
} from "../components/ui/Buttons";
import SelectFile from "../components/ui/SelectFile";
import { Form, Formik } from "formik";
import { Toaster, toast } from "sonner";
import "../css/catalogo.css";
import { useState,useEffect } from "react";
import DialogForm from "../components/ui/DialogForm";
import AddCategories from "../components/categories/AddCategories";
import data from "../const/catalogo.json";
import EditCatalogo from "../components/catalogo/EditCatologo";