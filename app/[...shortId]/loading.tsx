const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('/icon.png')] bg-left bg-contain bg-no-repeat bg-opacity-10 ">
      <div>
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-gray-800">URL Shortener</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-800">Redirecting...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
