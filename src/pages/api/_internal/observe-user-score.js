import app from "@/firebase";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const db = getFirestore(app);

const makeDeviceEntity = ({ name, score }) => ({
  name,
  score,
});

const makeAssignmentEntity = ({ order, name, level, score, devices }) => ({
  order,
  name,
  level,
  score,
  devices: devices?.map((x) =>
    makeDeviceEntity({
      name: x.name,
      score: x.score,
    })
  ),
});

const makeUserScoreEntity = ({ username, totalScore, assignments }) => ({
  username,
  totalScore,
  assignments: assignments?.map((x) =>
    makeAssignmentEntity({
      order: x.order,
      name: x.name,
      level: x.level,
      score: x.score,
      devices: x.devices,
    })
  ),
});

function mapDocsToUserScoreEntity(docs) {
  return docs?.map((doc) =>
    makeUserScoreEntity({
      username: doc.username,
      totalScore: doc.totalScore,
      assignments: doc.assignments,
    })
  );
}

export default function observeUserScore(onData) {
  const query = collection(db, "user_score");
  return onSnapshot(query, {
    next: (snapshot) => {
      const entity = mapDocsToUserScoreEntity(snapshot.docs);
      if (onData) onData(entity);
    },
    error: (_) => {},
    complete: () => {},
  });
}
