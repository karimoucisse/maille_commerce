const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center  space-y-6 pt-15">
      <p className="text-5xl">Contact</p>
      <div className="w-150 h-full grid gap-4  grid-cols-2">
        <input type="text" placeholder="Nom" className="input"/>
        <input type="text" placeholder="E-mail" className="input"/>
        <input type="text" placeholder="Téléphone" className="input w-full col-span-2"/>
		<textarea placeholder="Commentaire" className="textarea w-full h-full col-span-2 resize-none"></textarea>
      </div>
	  <div className="w-150 flex justify-start">
	  	<button className="btn bg-[#0C4039] text-zinc-50">Envoyer</button>
	  </div>
    </div>
  );
};

export default page;
