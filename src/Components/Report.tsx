import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ReportPage } from "../Styled-components/Report.styled";
import { VscReport } from "react-icons/vsc";
import { Button } from "../Styled-components/Customize.style";
import { FaHome } from "react-icons/fa";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { constants } from "../Constants";
const Report = () => {
  const linkRef = useRef();
  const history = useHistory();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState<string>("");
  const [link, setLink] = useState<string>("");
  useEffect(() => {
    setLink(
      `mailto:abhinavsardar.podar@gmail.com?body=${body}&subject=${subject}`
    );
  }, [subject, body]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (subject.trim() && body.trim()) {
      if (subject.length >= 51) {
        toast.error("Subject Length Too Big!");
      } else if (body.length >= 501) {
        toast.error("Body Length Too Big!");
      } else {
        //@ts-ignore
        linkRef.current.click();
      }
    } else {
      toast.error("Invalid Subject Or Body!");
    }
  };
  return (
    <ReportPage>
      <div className='header'>
        <span>
          Report An issue <VscReport />
        </span>
      </div>

      <form className='input' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            placeholder='Subject Of The Issue'
            name='subject'
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label
            style={{
              fontSize: "1.5vw",
              color: subject.length >= 51 ? "red" : constants.appAccentColor,
            }}
          >
            {subject.length}/50
          </label>
        </div>
        <div>
          {" "}
          <label htmlFor='body'>Body</label>
          <input
            type='text'
            placeholder='A little more about it...'
            name='body'
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label
            style={{
              fontSize: "1.5vw",
              color: body.length >= 501 ? "red" : constants.appAccentColor,
            }}
          >
            {body.length}/500
          </label>
        </div>
        <Button
          style={{
            paddingTop: "0.5vw",
            paddingBottom: "0.5vw",
            justifyContent: "center",
          }}
        >
          <span>Submit</span>
        </Button>
      </form>
      <Button onClick={() => history.push("/")}>
        <span>Go Back To Home </span>
        <FaHome />
      </Button>

      <a href={link} ref={linkRef}></a>
    </ReportPage>
  );
};

export default Report;
