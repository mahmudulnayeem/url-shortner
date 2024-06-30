import { Url } from "~~/model/url-model";
export async function generateMetadata({ params }: { params: { id: string } }) {
  const url = await Url.findOne({ _id: params.id });
  return {
    title: `Mini URL Shortener - List | analytics-${url.shortId}`,
    description: `Mini URL Shortener - List | analytics-${url.redirectUrl}`,
  };
}
const DetailsPage = ({ params }: { params: { id: string } }) => {
  return <div>DetailsPage{params.id}</div>;
};

export default DetailsPage;
