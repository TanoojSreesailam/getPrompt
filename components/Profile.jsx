import PromptCard from "./PromptCard";

const Profile = ({ name, desc, handleEdit, data, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">
        {desc} and share amazing prompts with the world, and let your
        imagination run wild.
        {console.log(data)}
      </p>
      <div className="mt-16 prompt_layout">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
