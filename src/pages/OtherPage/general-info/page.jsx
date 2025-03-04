import GeneralInfoForm from "../../../components/dashboard/generalInfoComponents/GeneralInfoForm";

export default function CompanyInformation() {
  return (
    <div className="container mx-auto p-6 pt-0">
      <h1 className="text-3xl header font-semibold mb-4">Company Information</h1>
      <div className="mt-9">
        <GeneralInfoForm />
      </div>
    </div>
  );
}
