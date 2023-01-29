import { FC } from 'react';

export const Skills: FC = () => {
    type SkillSet = {
      label: string,
      skills: Array<string>
    }
  
    let langs: Array<SkillSet> = [
      {label: "Programming Languages and Frameworks", skills: ["Julia", "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express", "Python",
      "Racket", "Sass", "Jupyter", "FFmpeg", "TensorFlow", "C"]},
      {label: "Graphical Skills", skills: ["Adobe Photoshop", "Adobe InDesign", "Adobe Illustrator", "Canva"]},
      {label: "Other Technical Skills", skills: ["DigitalOcean", "Git", "MongoDB"]}
    ]
  
    return (
      <div>
      {langs.map((i: any, num: number) => (
        <div key={num*12367} className="flex flex-col">
          <div>
            {i.label}:
          </div>
          <div className="flex flex-row flex-wrap">
          {i.skills.map((j: any, index: number) => (
            <img key={index*42323} style={{padding: "0.1rem"}} alt={j} src={`https://img.shields.io/static/v1?label=&message=${j.charAt(0).toUpperCase() + j.slice(1)}&style=flat&logo=${j}&labelColor=cbcbcb`}/>
          )
          )}
          </div>
        </div>
      ))}
      <p style={{margin: "0"}}>For a full list, see my resumé</p>
      </div>
    );
  }

  export default Skills;