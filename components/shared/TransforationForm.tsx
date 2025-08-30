"use client";

import { Button } from "@/components/ui/button";
import { defaultValues, formFields } from "@/constants";
import {
  validationSchemas,
  ValidationSchemaType,
} from "@/constants/validation";
import { FormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface TransformationFormProps {
  type: ValidationSchemaType;
}

const TransformationForm: React.FC<TransformationFormProps> = ({ type }) => {
  const schema = validationSchemas[type];
  const fields = formFields[type];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data);
      // TODO: Implement transformation logic here
      // await transformImage(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderField = (field: any) => {
    const {
      name,
      label,
      type: fieldType,
      placeholder,
      required,
      options,
    } = field;
    const error = errors[name as keyof FormData];

    if (fieldType === "select") {
      return (
        <div key={name} className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            {...register(name as keyof FormData)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">{placeholder}</option>
            {options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p className="text-sm text-red-500">{error.message as string}</p>
          )}
        </div>
      );
    }

    return (
      <div key={name} className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={fieldType}
          {...register(name as keyof FormData)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {error && (
          <p className="text-sm text-red-500">{error.message as string}</p>
        )}
      </div>
    );
  };

  return (
    <div className="mt-12 pt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {fields.map(renderField)}

        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
          >
            {isSubmitting ? "Processing..." : "Apply Transformation"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
            onClick={() => reset()}
          >
            Save Image
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransformationForm;
