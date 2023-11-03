import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'teal',
  },
  value: {
    fontSize: 14,
    marginBottom: 5,
  },
  prescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkblue',
  },
  line: {
    borderBottom: '2 solid teal',
    marginBottom: 10,
  },
  medicineSection: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  },
  medicineLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'teal',
  },
});

MyPDF.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

function MyPDF({ data, user }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Rx</Text>
          <Text style={styles.heading}>Medwise</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.label}>Patient Name: {data.userId.name}</Text>
            <Text style={styles.label}>Age: {data.userId.age}</Text>
            <Text style={styles.label}>Gender: {data.userId.gender}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Dr: {data.doctorId.name}</Text>
            <Text style={styles.label}>{data.doctorId.specialisation}</Text>
          </View>
        </View>

        <View style={styles.medicineSection}>
          <Text style={styles.prescription}>Prescription</Text>
          {data.medicines && Array.isArray(data.medicines) && data.medicines.length > 0 ? (
            data.medicines.map((medicineData, index) => (
              <View key={index}>
                <Text style={styles.medicineLabel}>Medicine: {medicineData.medicine}</Text>
                <Text style={styles.label}>Dose: {medicineData.selectedDose}</Text>
                {/* <Text style={styles.label}>Advice: {medicineData.feedback}</Text> */}
              </View>
            ))
          ) : (
            <Text style={styles.label}>No data available</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}

export default MyPDF;
