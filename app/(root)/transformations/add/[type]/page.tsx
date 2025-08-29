import Header from '@/components/shared/header';
import TransformationForm from '@/components/shared/TransforationForm';
import { transformationTypes } from '@/constants';
import { searchParamProps } from '@/types';
import React from 'react'

const AddTransformationTypePage = ({ params: { type } }: searchParamProps) => {
  const transformation = transformationTypes[type as keyof typeof transformationTypes];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <TransformationForm />
    </>
  );
};

export default AddTransformationTypePage;
