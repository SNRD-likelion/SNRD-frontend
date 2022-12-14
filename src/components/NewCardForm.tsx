import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { putCategories, putProjectInfo, putTasks } from "../api";
import { categoryState, dateState, newCardState, toDoState } from "../atom";
import { Calender } from "./Calender";

const Form = styled.form`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.white.veryDark};
  border-radius: 5px;
`;
const Title = styled.input`
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px;
  &:focus {
    outline: none;
    border: solid ${(props) => props.theme.navy};
  }
`;

const Label = styled.label`
  width: 100%;
  margin-top: 15px;
  padding-left: 5px;
  padding-bottom: 3px;
  color: ${(props) => props.theme.navy};
`;

const Submit = styled.input`
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 50%;
  font-weight: 500;
  font-size: 15px;
  background-color: ${(props) => props.theme.navy};
  color: ${(props) => props.theme.white.darker};
  margin: 15px 0;
`;

const Select = styled.select`
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.grey.darker};
  &:focus {
    outline: none;
    border: solid ${(props) => props.theme.navy};
  }
`;

const Option = styled.option`
  width: 100%;
`;

const DurationBox = styled.div`
  position: relative;

  width: 100%;
`;

const Duration = styled.input`
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  &:focus {
    outline: none;
  }
`;

interface IForm {
  topic: string;
  part: string;
}

export function NewCategoryForm() {
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [category, setCategory] = useRecoilState(categoryState);
  const mutation = useMutation(() => putCategories(category), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ topic }: IForm) => {
    const newTopic = {
      id: Date.now(),
      categoryIndex: category[newCard!].length,
      part: newCard!,
      topic: topic,
      contents: "",
      commentCounts: 0,
    };
    setCategory((allCategoies) => {
      return {
        ...allCategoies,
        [newCard!]: [...allCategoies[newCard!], newTopic],
      };
    });
    setNewCard(null);
  };
  useEffect(() => mutation.mutate(), [category]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>??????</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="????????? ????????? ????????? ???????????????"
      />
      <Submit type="submit" value="Done" />
    </Form>
  );
}
export function EditCategoryForm() {
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [category, setCategory] = useRecoilState(categoryState);
  const mutation = useMutation(() => putCategories(category), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = () => {};
  useEffect(() => mutation.mutate(), [category]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>??????</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="????????? ????????? ????????? ???????????????"
      />
      <Submit type="submit" value="Done" />
    </Form>
  );
}

export function NewCardForm() {
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [todos, setTodos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const mutation = useMutation(() => putTasks(todos), {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ topic, part }: IForm) => {
    const newTopic = {
      id: Date.now(),
      categoryIndex: category[part].length,
      part: part!,
      topic: topic,
      contents: "",
      commentCounts: 0,
    };
    setTodos((allTodos) => {
      return {
        ...allTodos,
        [newCard!]: [...allTodos[newCard!], newTopic],
      };
    });
    setNewCard(null);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>??????</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="????????? ????????? ????????? ???????????????"
      />
      <Label>??????</Label>
      <Select {...register("part")}>
        <Option value="plan">??????</Option>
        <Option value="design">?????????</Option>
        <Option value="frontend">???????????????</Option>
        <Option value="backend">?????????</Option>
      </Select>
      <Submit type="submit" value="Done" />
    </Form>
  );
}

export function EditProjectInfo() {
  const { id } = useParams();
  const [newCard, setNewCard] = useRecoilState(newCardState);
  const [date, setDate] = useState(false);
  const duration = useRecoilValue(dateState);

  // const startDate = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  // }).format(duration[0].startDate);
  // const endDate = new Intl.DateTimeFormat("ko-KR", {
  //   dateStyle: "full",
  // }).format(duration[0].endDate);

  const startDate = duration[0].startDate?.toLocaleDateString("ko", {
    dateStyle: "full",
  });
  const endDate = duration[0].endDate?.toLocaleDateString("ko", {
    dateStyle: "full",
  });

  const posting = {
    id,
    title: "",
    teammates: [],
    duration: duration,
    introduction: "",
  };

  const mutation = useMutation(putProjectInfo, {
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    // mutation.mutate({ id, posting });
    setNewCard(null);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>???????????? ??????</Label>
      <Title
        {...register("topic", { required: true })}
        placeholder="???????????? ????????? ???????????????."
      />
      <Label>???????????? ??????</Label>
      <DurationBox>
        <Duration
          value={`${startDate} ~ ${endDate}`}
          type="button"
          onClick={() => setDate(true)}
        />
        {date ? <Calender setCalender={setDate} /> : null}
      </DurationBox>
      <Label>??????</Label>
      <Title
        {...register("team")}
        placeholder="?????? ????????? ???????????????. (?????????, ?????????...)"
      />
      <Label>?????????</Label>
      <Title
        {...register("slogan")}
        placeholder="???????????? ??????????????? ????????? ????????? ???????????????."
      />

      <Submit type="submit" value="Done" />
    </Form>
  );
}
