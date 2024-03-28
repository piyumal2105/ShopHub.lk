import generator from "generate-password";

export const generateRandomPW = () =>{
    return generator.generate({
        length: 6,
        uppercase: true,
        numbers: true,
        lowercase: true,
      });
}