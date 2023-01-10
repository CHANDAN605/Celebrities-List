import Celebritie from "../model/celebritie-schema.js";

export const getCelebrities = async (request, response) => {
  try {
    const celebrities = await Celebritie.find({});
    return response.status(200).json(celebrities);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

export const getCelebritieById = async (request, response) => {
  try {
    const id = request.params.id;
    const celebritie = await Celebritie.findOne({ _id: id });
    return response.status(200).json(celebritie);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

export const editCelebritieById = async (request, response) => {
  try {
    const id = request.params.id;
    const first = request.body.first;
    const last = request.body.last;
    const country = request.body.country;
    const dob = request.body.dob;
    const gender = request.body.gender;
    const description = request.body.description;

    const celebritie = await Celebritie.updateOne(
      { id: id },
      {
        $set: {
          first: first,
          last: last,
          country: country,
          dob: dob,
          gender: gender,
          description: description,
        },
      }
    );
    console.log(celebritie);
    return response.status(200).json(celebritie);
  } catch (error) {}
};

export const deleteCelebritie = async (request, response) => {
  const id = request.params.id;
  const celebritie = await Celebritie.deleteOne({ id: id });
  return response.status(200).json(celebritie);
  // console.log(id);
};
