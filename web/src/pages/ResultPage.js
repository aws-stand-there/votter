import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Typography,
  Skeleton,
  Divider,
  List,
  Progress,
} from "antd";
import firebase from "firebase";

function ResultPage() {
  const { id } = useParams();
  const [vote, setVote] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("votes")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setVote(data);
        document.title = `Votter: ${data.title}`;
      });
  }, []);

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
              <Divider orientation="left">응답</Divider>
              <Typography.Paragraph>
                {vote.count}명이 응답했어요.{" "}
              </Typography.Paragraph>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={Object.keys(vote.options).map(
                  (key) => vote.options[key]
                )}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={item.text}
                      description={
                        <>
                          <Progress
                            percent={
                              item.count > 0
                                ? ((item.count / vote.count) * 100).toFixed(2)
                                : 0
                            }
                          />
                          <Row justify="start" style={{ marginTop: 8 }}>
                            <Typography.Text type="secondary">
                              {item.count}명
                            </Typography.Text>
                          </Row>
                        </>
                      }
                    />
                  </List.Item>
                )}
              ></List>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default ResultPage;
