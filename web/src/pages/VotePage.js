import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Typography,
  Skeleton,
  Divider,
  Space,
  Button,
  Result,
} from "antd";
import { useStorageState } from "react-storage-hooks";
import firebase from "firebase";

function VotePage() {
  const history = useHistory();
  const { id } = useParams();
  const [vote, setVote] = useState(null);
  const [voted, setVoted] = useStorageState(localStorage, id);

  useEffect(async () => {
    const vote = await firebase.firestore().collection("votes").doc(id).get();
    setVote(vote.data());
  }, []);

  const handleSubmit = useCallback((optionId) => {
    firebase
      .firestore()
      .collection("votes")
      .doc(id)
      .set(
        {
          options: {
            [optionId]: {
              count: firebase.firestore.FieldValue.increment(1),
            },
          },
          count: firebase.firestore.FieldValue.increment(1),
        },
        {
          merge: true,
        }
      );

    setVoted(vote.options[optionId]);
    history.push(`/votes/${id}`);
  });

  if (voted) {
    return (
      <Result
        status="success"
        title="투표 완료됨"
        subTitle={`${voted.text}로 응답한 투표입니다!`}
      />
    );
  }

  return (
    <Row justify="center" style={{ paddingTop: 32 }}>
      <Col span={24} lg={10}>
        <Card>
          {!vote ? (
            <Skeleton title paragraph={4} />
          ) : (
            <div>
              <Typography.Title level={2}>{vote.title}</Typography.Title>
              <Typography.Paragraph>{vote.desc}</Typography.Paragraph>
              <Divider />
              <Space direction="vertical" style={{ width: "100%" }}>
                {Object.keys(vote.options).map((id) => (
                  <Button
                    key={vote.options[id].id}
                    type="primary"
                    size="large"
                    style={{ width: "100%" }}
                    onClick={() => handleSubmit(vote.options[id].id)}
                  >
                    {vote.options[id].text}
                  </Button>
                ))}
              </Space>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default VotePage;
