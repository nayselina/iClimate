import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ExploreScreen() {
  const tips = [
    {
      id: 1,
      title: "Track Every Expense",
      description:
        "Record every purchase, even small ones, to know where your money goes.",
    },
    {
      id: 2,
      title: "Set a Monthly Budget",
      description:
        "Plan how much you can spend each month and stick to your budget.",
    },
    {
      id: 3,
      title: "Prioritize Needs",
      description:
        "Buy necessities before spending on wants to avoid overspending.",
    },
    {
      id: 4,
      title: "Save Before Spending",
      description:
        "Set aside a portion of your income as savings before making purchases.",
    },
    {
      id: 5,
      title: "Review Your Expenses",
      description:
        "Check your expense history regularly to identify unnecessary spending.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Financial Tips</Text>

      <Text style={styles.subtitle}>
        Improve your spending habits by following these simple tips.
      </Text>

      {tips.map((tip) => (
        <View key={tip.id} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.description}>{tip.description}</Text>
        </View>
      ))}

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Remember</Text>

        <Text style={styles.summaryText}>
          "Saving money isn't about earning more. It's about spending wisely."
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#081021",
    marginTop: 20,
  },

  subtitle: {
    color: "#666",
    marginTop: 8,
    marginBottom: 20,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16c26e",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },

  summary: {
    backgroundColor: "#16c26e",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },

  summaryTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  summaryText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 24,
    fontStyle: "italic",
  },
});