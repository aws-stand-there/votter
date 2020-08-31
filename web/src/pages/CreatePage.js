import React, { useState, useCallback } from "react";
import { Row, Col, Card, Form, Input, Typography, Button, message } from "antd";
import moment from "moment";
import "moment/locale/ko";
import VoteOptionList from "../components/VoteOptionList";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { useForm } from "antd/lib/form/Form";
import firebase from "firebase";
import { useHistory, useLocation } from "react-router-dom";

moment.locale("ko");

const titleRecommendCandidate = [
  "점심 메뉴 뭘로 할까요? 🍣",
  "저녁 뭐 먹을까요? 🍔",
  "명절 선물 골라주세요 😎",
];

const getTitleRecommend = () =>
  titleRecommendCandidate[
    Math.round(Math.random() * 10) % titleRecommendCandidate.length
  ];

function CreatePage() {
  const history = useHistory();
  const location = useLocation();

  const [titleRecommend] = useState(getTitleRecommend());

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [options, setOptions] = useState([]);

  const [form] = useForm();

  const handleNewOption = useCallback(() => {
    setOptions(
      produce(options, (draft) => {
        draft.push({
          id: nanoid(),
          text: "",
          count: 0,
        });
      })
    );
  }, [options]);

  const handleChangeOption = useCallback(
    (index, text) => {
      setOptions(
        produce(options, (draft) => {
          draft[index] = {
            ...draft[index],
            text,
          };
        })
      );
    },
    [options]
  );

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        setOptions(
          produce(options, (draft) => {
            draft.splice(result.source.index, 1);
          })
        );
        return;
      }

      const newOptions = Array.from(options);
      const [removed] = newOptions.splice(result.source.index, 1);
      newOptions.splice(result.destination.index, 0, removed);

      setOptions(newOptions);
    },
    [options]
  );

  const handleSubmit = async () => {
    const optionsObject = {};
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      optionsObject[option.id] = {
        ...option,
        index,
      };
    }

    const vote = await firebase.firestore().collection("votes").add({
      title,
      desc,
      options: optionsObject,
      count: 0,
    });

    message.success(`투표하기: ${window.location.href}votes/${vote.id}`, 5000);

    history.push(`/results/${vote.id}`);
  };

  return (
    <Row justify="center" style={{ paddingTop: 32 }}>
      <Col span={24} lg={10}>
        <Card>
          <Typography.Title level={2}>새 투표 📥</Typography.Title>
          <Form
            form={form}
            layout="vertical"
            scrollToFirstError
            onFinish={handleSubmit}
          >
            <Form.Item
              name="title"
              label="제목"
              required
              rules={[
                {
                  required: true,
                  message: "제목을 입력해주세요.",
                },
                {
                  message: "제목은 3글자 이상 입력해야해요.",
                  min: 3,
                },
              ]}
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="large"
                placeholder={titleRecommend}
              />
            </Form.Item>
            <Form.Item label="설명">
              <Input.TextArea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                size="large"
                placeholder="투표에 대한 설명을 자유롭게 적어주세요. ✍🏻"
              />
            </Form.Item>
            <Form.Item label="응답 항목" required>
              <VoteOptionList
                value={options}
                onCreate={handleNewOption}
                onChange={handleChangeOption}
                onDragEnd={handleDragEnd}
              />
            </Form.Item>
            <Row justify="end">
              <Button type="primary" size="large" htmlType="submit">
                투표 만들기
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default CreatePage;
