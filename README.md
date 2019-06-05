# EMV tags functions

## Scope

Handle encoding and decoding of BER-TLV data to/from string.

## Public API

### tagsDecode

(emvString, result, dolIdx)

Decodes EMV tag string from BER-TVL format to EMV tag object

params

- _emvString_ (string) - EMV tags in BER-TLV format
- _result_ (object) - result to return
- _dolIdx_ (integer) - position of the current tag in a DOL

result (object); each _key: value_ pair contains the following:

- _key_ (string) - EMV tag key
- _value_ (object) - EMV tag object
  - _tag_ (string) - EMV tag
  - _val_ (string) - EMV tag value **OR** nested EMV tags object, in the case
   when _tag_ is a DOL tag
  - _len_ (integer) - length of _val_ in bytes

  **NOTE: if the current tag is a DOL tag, _val_ will have the following _key:
   value_ structure**:
- _key_ (string) - EMV tag key
- _value_ (object) - EMV tag object
  - _tag_ (string) - EMV tag
  - _val_ (string) - EMV tag value; **NOTE: as the value of a DOL tag does not
   contain values for nested tags, this is usually ''**
  - _len_ (integer) - length of _val_ in bytes
  - _idx_ (integer) - position of the tag in the DOL

### dolDecode

(emvTags)

Adds values for tags nested in DOLs

params

- _emvTags_ (object) - each _key: value_ pair contains the following:
  - _key_ (string) - EMV tag key
  - _value_ (object) - EMV tag object
    - _tag_ (string) - EMV tag
    - _val_ (string) - EMV tag value; **NOTE: as the value of a DOL tag does
     not contain values for nested tags, this is usually ''**
    - _len_ (integer) - length of _val_ in bytes
  **NOTE: for each DOL tag, _val_ will have the following _key:
   value_ structure**:
- _key_ (string) - EMV tag key
- _value_ (object) - EMV tag object
  - _tag_ (string) - EMV tag
  - _val_ (string) - EMV tag value
  - _len_ (integer) - length of _val_ in bytes
  - _idx_ (integer) - position of the tag in the DOL

result (object) - _emvTags_ input object, with added values for tags nested in
 DOLs

### tagsEncode

(emvTags)

Encodes EMV tag object to EMV tag string

params

- _emvTags_ (object) - each _key: value_ pair contains the following:
  - _key_ (string) - EMV tag key
  - _value_ (object) - EMV tag object
    - _val_ (string) - EMV tag value
    - _tag_ (string) - EMV tag
    - _len_ (integer) - length of _val_ in bytes
    - _idx_ (integer) - indicates the position of the current tag; **NOTE:
     present only in case the input tags have to be ordered before encoding**

result

- (string) - EMV tag string in BER-TLV format

### flatten

(emv)

Reduces EMV tag object to _key: value_ pairs

params (object); each _key: value_ pair contains the following:

- _key_ (string) - EMV tag key
- _value_ (object) - EMV tag object
  - _tag_ (string) - EMV tag
  - _val_ (string) - EMV tag value
  - _len_ (integer) - length of _val_ in bytes

result (object); each _key: value_ pair contains the following:

- _key_ (string) - EMV tag key
- _value_ (string) - EMV tag value _val_

### unflatten

(emv)

Expands _key: value_ pairs to EMV tags object

params (object); __Default__: _{}_; each _key: value_ pair contains the
 following:

- _key_ (string) - EMV tag key
- _value_ (string) - EMV tag

result (object); each _key: value_ pair contains the following:

- _key_ (string) - EMV tag key
- _value_ (object) - EMV tag object
  - _tag_ (string) - EMV tag
  - _val_ (string) - EMV tag value
  - _len_ (integer) - length of _val_ in bytes

## Private API

### emvEncodeMapTags

()

Sets _emvTagsConfig.map.encode_ global object

params

- **None**

result

- **None**

**NOTE: _emvTagsConfig.map.encode_ global object has the following _key: value_
 structure:**

- _key_ (string) - EMV tag key
- _value_ (string) - EMV tag

### translateTagEncode

(tag)

Returns EMV tag matching the tag key parameter

params

- _tag_ (string) - EMV tag key; __Default__: ''

result

- (string) - EMV tag **in case _tag_ does not have _emv_ prepended**

OR

- (string) - _tag_ with _emv_ removed **in case _tag_ has _emv_ prepended**

### translateTagDecode

(tag)

Returns EMV tag key matching the tag parameter

params

- _tag_ (string) - EMV tag; __Default__: ''

result

- (string) - EMV tag key **in case _tag_ exists in the dictionary**

OR

- (string) - _emv_ prepended _tag_ **in case _tag_ does not exist in the
 dictionary**

### getNumVal

(val, len, dolLenDiff, compressedNumeric)

???





### getNonNumVal

(val, len, dolLenDiff)

???




### getValueHexLength

(tagObj)

Calculates the real length of a tag value in hexadecimal format

params (object)

- _val_ (string) - EMV tag value
- _len_ (integer) - EMV tag value length in bytes

result

- (string) - the real length of _tagObj.val_; **NOTE: in always contains even
 number of hexadecimal digits**

## Tags dictionary

### Known EMV tags

- _Amount, Authorised (NUMERIC)_
  - _tag_: _9F02_
  - _key_: _amountAuthorised_

- _Amount, Other (NUMERIC)_
  - _tag_: _9F03_
  - _key_: _amountOther_,

- _Terminal Country Code_
  - _tag_: _9F1A_
  - _key_: _terminalCountryCode_,

- _Transaction Currency Code_
  - _tag_: _5F2A_
  - _key_: _transactionCurrencyCode_,

- _Transaction Date_
  - _tag_: _9A_
  - _key_: _transactionDate_,

- _Transaction Type_
  - _tag_: _9C_
  - _key_: _transactionType_,

- _Template, AEF Data_
  - _tag_: _70_
  - _key_: _templateAEFData_,

- _Issuer Public Key Certificate_
  - _tag_: _90_
  - _key_: _issuerPublicKeyCertificate_,

- _Issuer Public Key Remainder_
  - _tag_: _92_
  - _key_: _issuerPublicKeyRemainder_,

- _Certification Authority Public Key Index (PKI)_
  - _tag_: _8F_
  - _key_: _certificationAuthorityPublicKeyIndex_,

- _Unpredictable Number (UN)_
  - _tag_: _9F37_
  - _key_: _unpredictableNumber_,

- _Issuer Public Key Exponent_
  - _tag_: _9F32_
  - _key_: _issuerPublicKeyExponent_,

- _Card Risk Management Data Object List 1 (CDOL1)_
  - _tag_: _8C_
  - _key_: _CDOL1_,

- _Card Risk Management Data Object List 2 (CDOL2)_
  - _tag_: _8D_
  - _key_: _CDOL2_,

- _Transaction Certificate Data Object List (TDOL)_
  - _tag_: _97_
  - _key_: _TDOL_,

- _Processing Options Data Object List (PDOL)_
  - _tag_: _9F38_
  - _key_: _PDOL_,

- _Dynamic Data Authentication Data Object List (DDOL)_
  - _tag_: _9F49_
  - _key_: _DDOL_,

- _Track 2 Equivalent Data_
  - _tag_: _57_
  - _key_: _track2EquivalentData_,

- _Application Primary Account Number (PAN)_
  - _tag_: _5A_
  - _key_: _pan_,

- _Application Primary Account Number (PAN) Sequence Number (PSN)_
  - _tag_: _5F34_
  - _key_: _panSeqNum_,

- _Application Transaction Counter (ATC)_
  - _tag_: _9F36_
  - _key_: _atc_,

- _Application Cryptogram (AC)_
  - _tag_: _9F26_
  - _key_: _applicationCryptogram_,

- _Cryptogram Information Data (CID)_
  - _tag_: _9F27_
  - _key_: _cryptogramInformationData_,

- _Application Version Number, Terminal_
  - _tag_: _9F09_
  - _key_: _terminalApplicationVersionNumber_,

- _Terminal Capabilities_
  - _tag_: _9F33_
  - _key_: _terminalCapabilities_,

- _Terminal Type_
  - _tag_: _9F35_
  - _key_: _terminalType_,

- _Transaction Sequence Counter_
  - _tag_: _9F41_
  - _key_: _transactionSequenceCounter_,

- _Acquirer Identifier_
  - _tag_: _9F01_
  - _key_: _acquirerIdentifier_,

- _Additional Terminal Capabilities (ATC)_
  - _tag_: _9F40_
  - _key_: _additionalTerminalCapabilities_,

- _Amount, Authorised (Binary)_
  - _tag_: _81_
  - _key_: _amountAuthorisedBinary_,

- _Amount, Other (Binary)_
  - _tag_: _9F04_
  - _key_: _amountOtherBinary_,

- _Amount, Reference Currency (Binary)_
  - _tag_: _9F3A_
  - _key_: _amountReferenceCurrency_,

- _Currency Code, Application_
  - _tag_: _9F42_
  - _key_: _applicationCurrencyCode_,

- _Currency Exponent, Application_
  - _tag_: _9F44_
  - _key_: _applicationCurrencyExponent_,

- _Application Discretionary Data_
  - _tag_: _9F05_
  - _key_: _applicationDiscretionaryData_,

- _Application Effective Date_
  - _tag_: _5F25_
  - _key_: _applicationEffectiveDate_,

- _Application Expiration Date_
  - _tag_: _5F24_
  - _key_: _applicationExpirationDate_,

- _Application File Locator (AFL)_
  - _tag_: _94_
  - _key_: _applicationFileLocatorAFL_,

- _Application Identifier (ADF Name)_
  - _tag_: _4F_
  - _key_: _applicationIdentifierAIDCard_,

- _Application Identifier (AID), Terminal_
  - _tag_: _9F06_
  - _key_: _applicationIdentifierAIDTerminal_,

- _Application Interchange Profile (AIP)_
  - _tag_: _82_
  - _key_: _applicationInterchangeProfile_,

- _Application Label_
  - _tag_: _50_
  - _key_: _applicationLabel_,

- _Application Preferred Name_
  - _tag_: _9F12_
  - _key_: _applicationPreferredName_,

- _Application Priority Indicator_
  - _tag_: _87_
  - _key_: _applicationPriorityIndicator_,

- _Currency Code, Application Reference_
  - _tag_: _9F3B_
  - _key_: _applicationReferenceCurrency_,

- _Currency Exponent, Application Reference_
  - _tag_: _9F43_
  - _key_: _applicationReferenceCurrencyExponent_,

- _Application Template_
  - _tag_: _61_
  - _key_: _applicationTemplate_,

- _Application Usage Control (AUC)_
  - _tag_: _9F07_
  - _key_: _applicationUsageControl_,

- _Application Version Number, Card_
  - _tag_: _9F08_
  - _key_: _applicationVersionNumber_,

- _Authorisation Code_
  - _tag_: _89_
  - _key_: _authorisationCode_,

- _Authorisation Response Code (ARC)_
  - _tag_: _8A_
  - _key_: _authorisationResponseCode_,

- _Bank Identifier Code (BIC)_
  - _tag_: _5F54_
  - _key_: _bankIdentifierCodeBIC_,

- _Cardholder Name_
  - _tag_: _5F20_
  - _key_: _cardholderName_,

- _Cardholder Name - Extended_
  - _tag_: _9F0B_
  - _key_: _cardholderNameExtended_,

- _Cardholder Verification Method (CVM) List_
  - _tag_: _8E_
  - _key_: _cvmList_,

- _Cardholder Verification Method (CVM) Results_
  - _tag_: _9F34_
  - _key_: _cvmResults_,

- _Public Key Index, Certification Authority, Terminal_
  - _tag_: _9F22_
  - _key_: _terminalCertificationAuthorityPublicKeyIndex_,

- _Command Template_
  - _tag_: _83_
  - _key_: _commandTemplate_,

- _Data Authentication Code_
  - _tag_: _9F45_
  - _key_: _dataAuthenticationCode_,

- _Dedicated File (DF) Name_
  - _tag_: _84_
  - _key_: _dedicatedFileDFName_,

- _Directory Definition File (DDF) Name_
  - _tag_: _9D_
  - _key_: _directoryDefinitionFileDDFName_,

- _Directory Discretionary Template_
  - _tag_: _73_
  - _key_: _directoryDiscretionaryTemplate_,

- _File Control Information (FCI) Issuer Discretionary Data_
  - _tag_: _BF0C_
  - _key_: _fciIssuerDiscretionaryData_,

- _File Control Information (FCI) Proprietary Template_
  - _tag_: _A5_
  - _key_: _fciProprietaryTemplate_,

- _File Control Information (FCI) Template_
  - _tag_: _6F_
  - _key_: _fciTemplate_,

- _ICC Dynamic Number_
  - _tag_: _9F4C_
  - _key_: _iccDynamicNumber_,

- _Integrated Circuit Card (ICC) PIN Encipherment Public Key Certificate_
  - _tag_: _9F2D_
  - _key_: _iccPINEnciphermentPublicKeyCertificate_,

- _Integrated Circuit Card (ICC) PIN Encipherment Public Key Exponent_
  - _tag_: _9F2E_
  - _key_: _iccPINEnciphermentPublicKeyExponent_,

- _Integrated Circuit Card (ICC) PIN Encipherment Public Key Remainder_
  - _tag_: _9F2F_
  - _key_: _iccPINEnciphermentPublicKeyRemainder_,

- _Integrated Circuit Card (ICC) Public Key Certificate_
  - _tag_: _9F46_
  - _key_: _iccPublicKeyCertificate_,

- _Integrated Circuit Card (ICC) Public Key Exponent_
  - _tag_: _9F47_
  - _key_: _iccPublicKeyExponent_,

- _Integrated Circuit Card (ICC) Public Key Remainder_
  - _tag_: _9F48_
  - _key_: _iccPublicKeyRemainder_,

- _Interface Device (IFD) Serial Number_
  - _tag_: _9F1E_
  - _key_: _interfaceDeviceIFDSerialNumber_,

- _International Bank Account Number (IBAN)_
  - _tag_: _5F53_
  - _key_: _internationalBankAccountNumberIBAN_,

- _Issuer Action Code - Default_
  - _tag_: _9F0D_
  - _key_: _issuerActionCodeDefault_,

- _Issuer Action Code - Denial_
  - _tag_: _9F0E_
  - _key_: _issuerActionCodeDenial_,

- _Issuer Action Code - Online_
  - _tag_: _9F0F_
  - _key_: _issuerActionCodeOnline_,

- _Issuer Application Data (IAD)_
  - _tag_: _9F10_
  - _key_: _issuerApplicationData_,

- _Issuer Authentication Data_
  - _tag_: _91_
  - _key_: _issuerAuthenticationData_,

- _Issuer Code Table Index_
  - _tag_: _9F11_
  - _key_: _issuerCodeTableIndex_,

- _Issuer Country Code_
  - _tag_: _5F28_
  - _key_: _issuerCountryCode_,

- _Issuer Country Code (alpha2 format)_
  - _tag_: _5F55_
  - _key_: _issuerCountryCodeAlpha2Format_,

- _Issuer Country Code (alpha3 format)_
  - _tag_: _5F56_
  - _key_: _issuerCountryCodeAlpha3Format_,

- _Issuer Identification Number (IIN)_
  - _tag_: _42_
  - _key_: _iin_,

- _Issuer Script Command_
  - _tag_: _86_
  - _key_: _issuerScriptCommand_,

- _Issuer Script Identifier_
  - _tag_: _9F18_
  - _key_: _issuerScriptIdentifier_,

- _Issuer Script Template 1_
  - _tag_: _71_
  - _key_: _issuerScriptTemplate1_,

- _Issuer Script Template 2_
  - _tag_: _72_
  - _key_: _issuerScriptTemplate2_,

- _Issuer Uniform resource locator (URL)_
  - _tag_: _5F50_
  - _key_: _issuerURL_,

- _Language Preference_
  - _tag_: _5F2D_
  - _key_: _languagePreference_,

- _Last Online Application Transaction Counter (ATC) Register_
  - _tag_: _9F13_
  - _key_: _lastOnlineATCRegister_,

- _Log Entry_
  - _tag_: _9F4D_
  - _key_: _logEntry_,

- _Log Format_
  - _tag_: _9F4F_
  - _key_: _logFormat_,

- _Lower Consecutive Offline Limit (LCOL)_
  - _tag_: _9F14_
  - _key_: _lowerConsecutiveOfflineLimit_,

- _Merchant Category Code (MCC)_
  - _tag_: _9F15_
  - _key_: _merchantCategoryCode_,

- _Merchant Identifier_
  - _tag_: _9F16_
  - _key_: _merchantIdentifier_,

- _Merchant Name and Location_
  - _tag_: _9F4E_
  - _key_: _merchantNameAndLocation_,

- _Personal Identification Number (PIN) Try Counter_
  - _tag_: _9F17_
  - _key_: _pinTryCounter_,

- _Point-of-Service (POS) Entry Mode_
  - _tag_: _9F39_
  - _key_: _pointOfServicePOSEntryMode_,

- _Response Message Template Format 1_
  - _tag_: _80_
  - _key_: _responseMessageTemplateFormat1_,

- _Response Message Template Format 2_
  - _tag_: _77_
  - _key_: _responseMessageTemplateFormat2_,

- _Service Code_
  - _tag_: _5F30_
  - _key_: _serviceCode_,

- _Short File Identifier (SFI)_
  - _tag_: _88_
  - _key_: _sfi_,

- _Signed Dynamic Application Data (SDAD)_
  - _tag_: _9F4B_
  - _key_: _signedDynamicApplicationData_,

- _Signed Static Application Data (SAD)_
  - _tag_: _93_
  - _key_: _signedStaticApplicationData_,

- _Static Data Authentication Tag List (SDA)_
  - _tag_: _9F4A_
  - _key_: _staticDataAuthenticationTagList_,

- _Terminal Floor Limit_
  - _tag_: _9F1B_
  - _key_: _terminalFloorLimit_,

- _Terminal Identification_
  - _tag_: _9F1C_
  - _key_: _terminalIdentification_,

- _Terminal Risk Management Data_
  - _tag_: _9F1D_
  - _key_: _terminalRiskManagementData_,

- _Terminal Verification Results (TVR)_
  - _tag_: _95_
  - _key_: _terminalVerificationResults_,

- _Track 1 Discretionary Data_
  - _tag_: _9F1F_
  - _key_: _track1DiscretionaryData_,

- _Track 2 Discretionary Data_
  - _tag_: _9F20_
  - _key_: _track2DiscretionaryData_,

- _Transaction Certificate (TC) Hash Value_
  - _tag_: _98_
  - _key_: _transactionCertificateTCHashValue_,

- _Transaction Currency Exponent_
  - _tag_: _5F36_
  - _key_: _transactionCurrencyExponent_,

- _Transaction Personal Identification Number (PIN) Data_
  - _tag_: _99_
  - _key_: _pinData_,

- _Currency Code, Transaction Reference_
  - _tag_: _9F3C_
  - _key_: _transactionReferenceCurrencyCode_,

- _Currency Exponent, Transaction Reference_
  - _tag_: _9F3D_
  - _key_: _transactionReferenceCurrencyExponent_,

- _Transaction Status Information (TSI)_
  - _tag_: _9B_
  - _key_: _transactionStatusInformation_,

- _Transaction Time_
  - _tag_: _9F21_
  - _key_: _transactionTime_,

- _Upper Consecutive Offline Limit (UCOL)_
  - _tag_: _9F23_
  - _key_: _upperConsecutiveOfflineLimit_

### Long tags

Indicates the value of the first byte for tags known to be two bytes long

- _5f_
- _9f_

### DOL numeric types

Indicates the data type for tags in DOLs

- _9F37_ - non numeric
- _9F02_ - non numeric
- _9F03_ - non numeric
- _9F1A_ - non numeric
- _5F2A_ - non numeric
- _9A_ - non numeric
- _9C_ - non numeric
