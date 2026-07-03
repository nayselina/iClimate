import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffColors } from '@/constants/staff-colors';
import { CalendarEvent, STAFF_CALENDAR_EVENTS, STAFF_CALENDAR_MARKED_DAYS } from '@/contexts/staff-data';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildMonthGrid(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  const cells: { day: number; inMonth: boolean }[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - startWeekday - daysInMonth + 1, inMonth: false });
  }
  return cells;
}

const EVENT_TONE = {
  planting: { bg: '#E1F3E7', text: StaffColors.accent },
  harvest: { bg: '#FCEBD3', text: '#C97A1F' },
  warning: { bg: '#FBE3E3', text: '#D9453E' },
} as const;

function EventCard({
  event,
  onEdit,
  onDelete,
}: {
  event: CalendarEvent;
  onEdit: (e: CalendarEvent) => void;
  onDelete: (e: CalendarEvent) => void;
}) {
  const tone = EVENT_TONE[event.type];
  return (
    <View style={styles.eventCard}>
      <View style={[styles.eventDateBlock, { backgroundColor: tone.bg }]}>
        <Text style={[styles.eventDay, { color: tone.text }]}>{event.day}</Text>
        <Text style={[styles.eventMonth, { color: tone.text }]}>{event.month}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <View style={styles.eventActionsRow}>
          <Pressable style={styles.smallIconButton} onPress={() => onEdit(event)} hitSlop={6}>
            <Ionicons name="create-outline" size={14} color="#3E6FD9" />
          </Pressable>
          <Pressable style={styles.smallIconButtonDanger} onPress={() => onDelete(event)} hitSlop={6}>
            <Ionicons name="trash-outline" size={14} color="#D9453E" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function ManageCalendarScreen() {
  const [cursor, setCursor] = useState(() => new Date(2026, 4, 20)); // May 2026, matches mock data
  const [events, setEvents] = useState<CalendarEvent[]>(STAFF_CALENDAR_EVENTS);
  const today = 20;

  const year = cursor.getFullYear();
  const monthIndex = cursor.getMonth();
  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const grid = useMemo(() => buildMonthGrid(year, monthIndex), [year, monthIndex]);

  const changeMonth = (delta: number) => {
    setCursor(new Date(year, monthIndex + delta, 1));
  };

  const handleEdit = (event: CalendarEvent) => {
    Alert.alert('Edit Entry', `Hook this up to your edit flow for "${event.title}".`);
  };

  const handleDelete = (event: CalendarEvent) => {
    Alert.alert('Delete Entry', `Remove "${event.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setEvents((prev) => prev.filter((e) => e.id !== event.id)),
      },
    ]);
  };

  const handleAdd = () => {
    Alert.alert('New Calendar Entry', 'Hook this up to your create-entry flow.');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StaffHeader title="Manage Calendar" />

      <View style={styles.flexFill}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.calendarCard}>
            <View style={styles.monthRow}>
              <Pressable onPress={() => changeMonth(-1)} hitSlop={10} style={styles.monthArrow}>
                <Ionicons name="chevron-back" size={16} color={StaffColors.textDark} />
              </Pressable>
              <Text style={styles.monthLabel}>{monthLabel}</Text>
              <Pressable onPress={() => changeMonth(1)} hitSlop={10} style={styles.monthArrow}>
                <Ionicons name="chevron-forward" size={16} color={StaffColors.textDark} />
              </Pressable>
            </View>

            <View style={styles.weekdayRow}>
              {WEEKDAYS.map((w, i) => (
                <Text key={`${w}-${i}`} style={styles.weekdayText}>
                  {w}
                </Text>
              ))}
            </View>

            <View style={styles.grid}>
              {grid.map((cell, idx) => {
                const isToday = cell.inMonth && cell.day === today;
                const isMarked = cell.inMonth && STAFF_CALENDAR_MARKED_DAYS.includes(cell.day);
                return (
                  <View key={idx} style={styles.cell}>
                    <View style={[styles.cellInner, isToday && styles.cellToday]}>
                      <Text
                        style={[
                          styles.cellText,
                          !cell.inMonth && styles.cellTextMuted,
                          isToday && styles.cellTextToday,
                        ]}>
                        {cell.day}
                      </Text>
                    </View>
                    {isMarked && !isToday ? <View style={styles.dot} /> : null}
                    {isToday ? <View style={[styles.dot, styles.dotToday]} /> : null}
                  </View>
                );
              })}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Scheduled Entries</Text>
          {events.map((e) => (
            <EventCard key={e.id} event={e} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </ScrollView>

        <Pressable style={styles.fab} onPress={handleAdd} hitSlop={6}>
          <Ionicons name="add" size={26} color="#ffffff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: StaffColors.bg },
  flexFill: { flex: 1 },
  content: { padding: 16, paddingBottom: 96 },

  calendarCard: {
    backgroundColor: StaffColors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  monthArrow: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StaffColors.surfaceMuted,
  },
  monthLabel: { fontSize: 15, fontWeight: '800', color: StaffColors.textDark },

  weekdayRow: { flexDirection: 'row', marginBottom: 6 },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: StaffColors.textFaint,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, alignItems: 'center', marginBottom: 4 },
  cellInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellToday: { backgroundColor: StaffColors.deepGreen },
  cellText: { fontSize: 13, fontWeight: '600', color: StaffColors.textDark },
  cellTextMuted: { color: StaffColors.textFaint, opacity: 0.4 },
  cellTextToday: { color: '#ffffff', fontWeight: '800' },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: StaffColors.accent,
    marginTop: 2,
  },
  dotToday: { backgroundColor: '#F5B342' },

  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: 0.4,
    color: StaffColors.textFaint,
    marginBottom: 10,
    marginTop: 4,
  },

  eventCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: StaffColors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  eventDateBlock: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDay: { fontSize: 16, fontWeight: '800', lineHeight: 18 },
  eventMonth: { fontSize: 9.5, fontWeight: '800', letterSpacing: 0.3 },
  eventTitle: { fontSize: 13.5, fontWeight: '700', color: StaffColors.textDark, marginBottom: 3 },
  eventDescription: { fontSize: 12, color: StaffColors.textMid, lineHeight: 16, marginBottom: 8 },
  eventActionsRow: { flexDirection: 'row', gap: 8 },
  smallIconButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3ECFB',
  },
  smallIconButtonDanger: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBE3E3',
  },

  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: StaffColors.deepGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});