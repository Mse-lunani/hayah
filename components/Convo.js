import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";
import { View } from "react-native";
export const Convo = [
  {
    timestamp: "2023-10-29 09:00:00",
    speaker: "Human",
    message:
      "Hello, AI! I have some questions about pregnancy. Can you provide me with some information?",
  },
  {
    timestamp: "2023-10-29 09:01:30",
    speaker: "AI",
    message:
      "Of course, I'd be happy to help. What specific information are you looking for regarding pregnancy?",
  },
  {
    timestamp: "2023-10-29 09:02:45",
    speaker: "Human",
    message:
      "I'd like to know about the common signs and symptoms of pregnancy. Can you list a few?",
  },
  {
    timestamp: "2023-10-29 09:03:15",
    speaker: "AI",
    message:
      "Certainly. Common signs and symptoms of pregnancy include missed periods, morning sickness, breast tenderness, fatigue, frequent urination, and mood swings. However, it's important to remember that these can vary from person to person.",
  },
  {
    timestamp: "2023-10-29 09:04:30",
    speaker: "Human",
    message: "What about the stages of pregnancy? Can you explain those to me?",
  },
  {
    timestamp: "2023-10-29 09:05:15",
    speaker: "AI",
    message:
      "Pregnancy is typically divided into three trimesters. The first trimester lasts from weeks 1 to 12, the second trimester from weeks 13 to 27, and the third trimester from weeks 28 to 40. Each trimester comes with its own set of changes and developments for both the mother and the baby.",
  },
  {
    timestamp: "2023-10-29 09:06:00",
    speaker: "Human",
    message:
      "That's helpful. What can you tell me about prenatal care and its importance during pregnancy?",
  },
  {
    timestamp: "2023-10-29 09:07:15",
    speaker: "AI",
    message:
      "Prenatal care is crucial for the health of both the mother and the baby. It involves regular check-ups with healthcare providers, monitoring the baby's growth and development, and receiving important guidance on nutrition, exercise, and any potential complications. Early and consistent prenatal care can help ensure a healthy pregnancy and delivery.",
  },
  {
    timestamp: "2023-10-29 09:08:30",
    speaker: "Human",
    message:
      "Thank you for the information, AI. This has been really helpful in understanding pregnancy better.",
  },
  {
    timestamp: "2023-10-29 09:09:00",
    speaker: "AI",
    message:
      "You're welcome! If you have any more questions or need further information, feel free to ask. I'm here to help.",
  },
];

export const MessageAI = (props) => {
  const styles = useStyleSheet(styles2);
  const theme = useTheme();
  return (
    <View style={styles.aiBubble}>
      <Text style={styles.messageText}>{props.message}</Text>
    </View>
  );
};
export const Human = (props) => {
  const styles = useStyleSheet(styles2);
  const theme = useTheme();
  return (
    <View style={styles.speakerBubble}>
      <Text style={styles.messageText2}>{props.message}</Text>
    </View>
  );
};
const styles2 = StyleService.create({
  parent: {
    flex: 0.95,
  },
  messagesendbox: {
    margin: 20,
  },
  speakerBubble: {
    maxWidth: "70%",
    alignSelf: "flex-end",
    backgroundColor: "#25d366", // WhatsApp green
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  aiBubble: {
    maxWidth: "70%",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ece5dd",
  },
  messageText: {
    fontSize: 16,
  },
  messageText2: {
    color: "white",
    fontSize: 16,
  },
});
