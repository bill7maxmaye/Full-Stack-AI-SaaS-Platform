import Header from "@/components/shared/header";
import TransformationForm from "@/components/shared/TransforationForm";
import { transformationTypes } from "@/constants";
import { ValidationSchemaType } from "@/constants/validation";

// Note: Inline props typing to match Next.js App Router expectations for dynamic routes
const AddTransformationTypePage = async (props: {
  params: Promise<{ type: string }>;
}) => {
  const { type } = await props.params;
  const transformation =
    transformationTypes[type as keyof typeof transformationTypes];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <TransformationForm type={type as ValidationSchemaType} />
    </>
  );
};

export default AddTransformationTypePage;
