import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: { margin: 'auto', flexDirection: 'row' },
    tableColHeader: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
    tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
});

const PDFDocument = ({ data, TotalPrice }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Order Details</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Name</Text>
                        <Text style={styles.tableColHeader}>Quantity</Text>
                        <Text style={styles.tableColHeader}>Price</Text>
                        <Text style={styles.tableColHeader}>Sub Total</Text>
                    </View>
                    {data.map((item) => (
                        <View style={styles.tableRow} key={item._id}>
                            <Text style={styles.tableCol}>{item.name}</Text>
                            <Text style={styles.tableCol}>{item.quantity}</Text>
                            <Text style={styles.tableCol}>{item.sellingPrice}</Text>
                            <Text style={styles.tableCol}>{item.quantity * item.sellingPrice}</Text>
                        </View>
                    ))}
                </View>
                <Text style={{ textAlign: 'right', marginTop: 10 }}>Total Price: {TotalPrice} LKR</Text>
            </View>
        </Page>
    </Document>
);

export default PDFDocument;
