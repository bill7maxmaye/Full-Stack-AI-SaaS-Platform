import Header from "@/components/shared/header";
import TransformationForm from "@/components/shared/TransforationForm";
import { transformationTypes } from "@/constants";
// Note: Inline props typing to match Next.js App Router expectations for dynamic routes

const AddTransformationTypePage = ({
  params: { type },
}: {
  params: { type: string };
}) => {
  const transformation =
    transformationTypes[type as keyof typeof transformationTypes];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <TransformationForm />
    </>
  );
};

export default AddTransformationTypePage;
