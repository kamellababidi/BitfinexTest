import React, { useCallback, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { IBook } from '../../store/book/types';

import { SocketService } from '../../services/socket';
import { LayoutAnimator } from '../../helper/layout-animator';

export const OrderBookScreen = (): React.JSX.Element => {

  const isConnected: boolean = useSelector((state: any) => state.book).isConnected;
  const books: IBook[] = useSelector((state: any) => state.book).books;
  // --------------

  useEffect(() => {
    SocketService.connectToSocket();
  }, []);
  // --------------

  useEffect(() => {
    LayoutAnimator.animateNext();
  }, [books]);

  const connectToSocket = useCallback(() => {
    SocketService.connectToSocket();
  }, []);
  // --------------

  const closeConnection = useCallback(() => {
    SocketService.disconnect();
  }, []);
  // --------------

  const renderBook = useCallback((book: any) => {
    const props: IBook = book.item;
    return (
      <View style={styles.titels}>
        <Text style={styles.entryLabel}>{props[1]}</Text>
        <Text style={styles.entryLabel}>{props[2]}</Text>
        <Text style={styles.entryLabel}>{props[0]}</Text>
      </View>
    );
  }, []);
  // --------------

  const keyExtractorBooks = useCallback((book: IBook) => {
    return `${book[0]}`;
  }, []);
  // --------------

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Order book BTC/USD</Text>

      {/* Bid list */}
      <View style={styles.titels}>
        <Text style={styles.titleLabel}>COUNT</Text>
        <Text style={styles.titleLabel}>AMOUNT</Text>
        <Text style={styles.titleLabel}>TOTAL</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={books}
          keyExtractor={keyExtractorBooks}
          renderItem={renderBook}
        />
      </View>

      {/* Footer */}
      <View style={styles.bottomControls}>
        {/* Connection Controls */}
        <View style={styles.connectionBtnsContainer}>
          <TouchableOpacity onPress={connectToSocket} style={styles.controlBtn}>
            <Text style={styles.btn}>Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeConnection} style={styles.controlBtn}>
            <Text style={[styles.btn, { color: 'red' }]}>Disconnect</Text>
          </TouchableOpacity>
        </View>
        {/* Connection status */}
        <Text style={[styles.connectionStatus, { color: isConnected ? 'green' : 'red' }]}>{isConnected ? 'CONNECTED' : 'DISCONNECTED'}</Text>
      </View>
    </SafeAreaView>
  );
  // ----------------------------------------------------------------------------------------
};

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172d3e',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    height: 120,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#0E3452',
  },
  connectionBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: '#000000',
    padding: 14,
  },
  controlBtn: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#000000',
  },
  btn: {
    color: 'green',
    opacity: 0.8,
  },
  connectionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 6,
  },
  listContainer: {
    paddingTop: 10,
    height: '70%',
  },
  titels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleLabel: {
    color: '#FFFFFF',
  },
  entryLabel: {
    color: '#FFFFFF',
    opacity: 0.6,
  },
});
// ------------------------------------------------------------------------------------------
