import React, { useState, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Typography,
  Checkbox,
  DatePicker,
  Button,
  Space,
} from "antd";
import moment from "moment";
import "moment/locale/ko";
import VoteOptionList from "../components/VoteOptionList";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { useForm } from "antd/lib/form/Form";

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
  const [title, setTitle] = useState("");
  const [titleRecommend] = useState(getTitleRecommend());
  const [options, setOptions] = useState([]);

  const [form] = useForm();

  const handleNewOption = useCallback(() => {
    setOptions(
      produce(options, (draft) => {
        draft.push({
          id: nanoid(),
          text: "",
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

  return (
    <Row justify="center" style={{ marginTop: 32 }}>
      <Col span={24} lg={10}>
        <Card>
          <Typography.Title level={2}>새 투표 📥</Typography.Title>
          <Form form={form} layout="vertical" scrollToFirstError>
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
            <Form.Item label="마감 시간">
              <DatePicker
                showTime
                placeholder="날짜와 시간을 선택해주세요"
                locale="ko"
              />
            </Form.Item>
            <Form.Item label="옵션">
              <Space direction="vertical">
                <Checkbox>응답을 복수 선택할 수 있습니다</Checkbox>
                <Checkbox>투표 결과를 공개합니다</Checkbox>
              </Space>
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
