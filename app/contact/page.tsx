const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center  space-y-6 pt-15">
      <p className="text-5xl">Contact</p>
      <div className="p-6 w-full sm:w-150 h-full">
        <div className="grid gap-4 sm:grid-cols-2">
          <input type="text" placeholder="Nom" className="input w-full" />
          <input type="text" placeholder="E-mail" className="input w-full" />
          <input
            type="text"
            placeholder="Téléphone"
            className="input w-full sm:col-span-2"
          />
          <textarea
            placeholder="Commentaire"
            className="textarea w-full h-full sm:col-span-2 resize-none"
          ></textarea>
          <div className="flex justify-start">
            <button className="bg-[#0C4039] text-zinc-50 text-sm py-3 px-8">Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
