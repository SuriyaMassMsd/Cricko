const PlayerCard = ({ data }) => {
  const { playerName, profilePic, role } = data;
  return (
    <div className="px-20">
      <div
        style={{
          background:
            "linear-gradient(180deg, #0D0B23 0%, #1E126A 40%, #FF3E9D 100%)",
        }}
        className="w-[250px] h-auto px-6 py-4 rounded relative flex justify-center items-center flex-col"
        id="player-card"
      >
        <span className="px-4 py-1 text-xs absolute top-2 right-2 rounded bg-gradient-to-r from-green-500 to-lime-500 text-white uppercase font-semibold shadow-[0_0_15px_#00ff73]">
          {role}
        </span>
        <img
          src="/ipl-logo.png"
          alt=""
          className="w-[40px] h-auto absolute left-2 top-2 filter invert brightness-0 "
        />
        <img
          className="w-[300px] h-[200px] rounded-full object-cover border-4 border-[#fcee6f]  shadow-[0_0_30px_#ff3e9d] mt-6"
          src={
            profilePic
              ? profilePic
              : "https://imgs.search.brave.com/EdUDgFxOWJY4ctoYqC0PihEVUkN0lMop-fUM2qHRDc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LW1h/bGUtcnVnYnktcGxh/eWVyLWhvbGRpbmct/YmFsbC13aXRoLWNv/bG9yLWVmZmVjdF8y/My0yMTQ4NzkzMzIy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
          }
          alt={profilePic}
        />

        <h1 className="text-2xl font-semibold text-white capitalize ">
          {playerName}
        </h1>
      </div>
    </div>
  );
};

export default PlayerCard;
